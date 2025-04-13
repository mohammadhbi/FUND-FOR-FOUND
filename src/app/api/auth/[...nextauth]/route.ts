import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';


console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials, error }) {
      // لاگ برای callback ورود
      console.log('SignIn Callback:', {
        user,
        account,
        profile,
        email,
        credentials,
        error,
      });
      return true; // ادامه فرآیند لاگین
    },
    async redirect({ url, baseUrl }) {
      // لاگ برای ریدایرکت
      console.log('Redirect Callback:', { url, baseUrl });
      return url.startsWith(baseUrl) ? url : baseUrl; // ریدایرکت به URL مجاز
    },
    async session({ session, token, user }) {
      // لاگ برای سشن
      console.log('Session Callback:', { session, token, user });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // لاگ برای توکن JWT
      console.log('JWT Callback:', { token, user, account, profile, isNewUser });
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };