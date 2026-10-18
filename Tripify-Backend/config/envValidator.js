const requiredEnvVars = ["PORT", "MONGO_URI", "JWT_SECRET", "JWT_REFRESH_SECRET", "CLIENT_URL"];

function validateEnvironment() {
  const missing = [];

  requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  });

  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:");
    missing.forEach((v) => console.error(`   - ${v}`));
    console.error("\n📋 Please check your .env file or environment variables");
    console.error("📖 See .env.example for the required format\n");
    process.exit(1);
  }

  console.log("✅ All required environment variables are configured");

  // Additional validation
  if (process.env.JWT_SECRET.length < 32) {
    console.warn("⚠️  WARNING: JWT_SECRET should be at least 32 characters");
  }

  if (!process.env.MONGO_URI.includes("mongodb")) {
    console.error("❌ MONGO_URI does not appear to be valid");
    process.exit(1);
  }

  console.log("✅ Environment variables validated successfully\n");
}

module.exports = validateEnvironment;
