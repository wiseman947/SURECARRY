export default function VerifyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md text-center">
        <h1 className="text-xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email. Please check your inbox and click the link to activate your account.
        </p>
        <a
          href="/services"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Continue to Services
        </a>
      </div>
    </main>
  );
}