import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';

const prisma = new PrismaClient();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy_key', // Ensure it doesn't crash if env isn't set yet
});

const SYSTEM_PROMPT = `
You are SureCarry AI Support Assistant.

SureCarry is a smart transportation and delivery platform offering:
- Ride services
- Delivery services
- Packing and logistics services

Your responsibilities:
- Help users book services
- Explain pricing clearly
- Guide users through tracking
- Assist with platform usage

Rules:
- Be professional, concise, and helpful
- Respond like a premium service (Uber/Bolt standard)
- Always guide users step-by-step
- Never guess pricing — calculate when needed. If they ask for a price and provide pickup, dropoff, and service type, reply with: "Your estimated fare is ₦2500. Would you like to proceed?" (using 2500 as dummy for now) 
- If unsure, say: "Let me connect you to human support"

Tone:
- Smart
- Friendly
- Efficient
`;

const ESCALATION_KEYWORDS = ['human', 'agent', 'help', 'operator', 'real person'];

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, userId, chatId } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    // Determine Escalation
    const isEscalation = ESCALATION_KEYWORDS.some(k => message.toLowerCase().includes(k));

    let activeChatId = chatId;
    let chat;

    if (!activeChatId) {
      // Create new chat
      chat = await prisma.supportChat.create({
        data: {
          userId: userId || null,
          status: isEscalation ? 'ESCALATED' : 'ACTIVE',
        }
      });
      activeChatId = chat.id;
    } else {
      chat = await prisma.supportChat.findUnique({ where: { id: activeChatId } });
      if (!chat) {
        res.status(404).json({ error: 'Chat not found' });
        return;
      }
      
      if (isEscalation && chat.status !== 'ESCALATED') {
        chat = await prisma.supportChat.update({
          where: { id: activeChatId },
          data: { status: 'ESCALATED' }
        });
      }
    }

    // Save User message
    await prisma.supportMessage.create({
      data: {
        chatId: activeChatId,
        role: 'user',
        content: message
      }
    });

    if (chat.status === 'ESCALATED') {
      // Return automatic escalation response
      const escalationReply = "I am connecting you to a human agent. They will get back to you shortly.";
      await prisma.supportMessage.create({
        data: { chatId: activeChatId, role: 'system', content: escalationReply }
      });
      res.json({ reply: escalationReply, chatId: activeChatId, status: 'ESCALATED' });
      return;
    }

    // Fetch history for AI Context
    const history = await prisma.supportMessage.findMany({
      where: { chatId: activeChatId },
      orderBy: { createdAt: 'asc' },
    });

    // We take last 10 messages for context size, plus system
    const messagesForAI: any[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10).map(msg => ({ role: (msg.role === 'admin' ? 'assistant' : msg.role), content: msg.content }))
    ];

    let aiReply = '';
    
    // Attempt OpenAI generation
    try {
      if (process.env.OPENAI_API_KEY) {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: messagesForAI,
        });
        aiReply = completion.choices[0].message.content || 'I am having trouble responding right now.';
      } else {
         // Fallback if no API Key during testing
         aiReply = "I am SureCarry AI. Please add your OPENAI_API_KEY to the backend .env to enable true intelligence.";
      }
    } catch (apiErr: any) {
      console.error("OpenAI Error:", apiErr.message);
      aiReply = "I am currently undergoing maintenance. Should I transfer you to a human agent?";
    }

    // Save AI response
    await prisma.supportMessage.create({
      data: {
        chatId: activeChatId,
        role: 'assistant',
        content: aiReply
      }
    });

    res.json({ reply: aiReply, chatId: activeChatId, status: chat.status });
  } catch (error: any) {
    console.error('Chat Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getActiveChats = async (req: Request, res: Response): Promise<void> => {
  try {
    const chats = await prisma.supportChat.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve chats' });
  }
};

export const getChatMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const messages = await prisma.supportMessage.findMany({
      where: { chatId: id },
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

export const adminReply = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message required' });
      return;
    }

    // Ensure status is ESCALATED or we force it so AI stops
    await prisma.supportChat.update({
      where: { id },
      data: { status: 'ESCALATED' }
    });

    const reply = await prisma.supportMessage.create({
      data: {
        chatId: id,
        role: 'admin',
        content: message
      }
    });

    res.json(reply);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send admin reply' });
  }
};
