import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User as NextAuthUser } from 'next-auth';

// تنظیمات NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // استفاده از credentials برای تایید کاربر
        if (credentials?.username && credentials?.password) {
          const user: NextAuthUser = { id: '1', name: 'User', email: 'user@example.com' };
          // اگر نام کاربری و پسورد صحیح بود، کاربر تایید می‌شود
          if (user) {
            return user;
          }
        }
        // در صورت عدم تطابق، هیچ‌کس تایید نمی‌شود
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      // تایید اینکه session.user وجود دارد و سپس id را اضافه می‌کنیم
      if (session.user) {
        session.user.id = token.sub;  // اگر `sub` وجود دارد
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // مدت زمان زندگی توکن
  },
  pages: {
    signIn: '/signin',
  },
};

// گسترش تایپ session.user برای اضافه کردن `id`
declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
