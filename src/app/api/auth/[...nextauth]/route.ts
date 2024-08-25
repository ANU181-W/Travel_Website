import { prisma } from "@/config/prisma";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error(
    "Missing Google Client ID or Secret in environment variables."
  );
}

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
];

const handler = NextAuth({
  providers: providers,
  callbacks: {
    async signIn({ user, account }: any) {
      console.log("signIn:", user, account);

      const { email, image, name } = user;
      const { provider, providerAccountId } = account;
      const userData = {
        email,
        image,
        name,
        provider,
        providerAccountId,
      };
      try {
        const userInfo = await prisma.user.create({ data: userData });
      } catch (e) {
        console.log(e);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
