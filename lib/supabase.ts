import { createClient } from "@supabase/supabase-js";

export type DatabaseUserTask = {
  id: number;
  createdat: string;
  title: string;
};

export type DatabaseUserTaskDetail = {
  id: number;
  row: number;
  timeType: string;
  weekConfirm?: string;
  week?: string;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type DataBase = {
  public: {
    Tables: {
      taskApp: {
        Row: {
          id: number;
          createdat: string;
          title: string;
        };
        Insert: {
          title: string;
        };
        Update: {
          id?: never;
          createdat?: string;
          title: string;
        };
      };
      taskDetailApp: {
        Row: {
          id: number;
          row: number;
          timeType: string;
          weekConfirm: Json | null;
          week: Json | null;
        };
        Insert: {
          id: number;
          row?: number;
          timeType: string;
          weekConfirm?: Json | null;
          week?: Json | null;
        };
        Update: {
          id: number;
          row?: number;
          timeType: string;
          weekConfirm?: Json | null;
          week?: Json | null;
        };
      };
    };
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<DataBase>(supabaseUrl, supabaseAnonKey, {
  // localStorage: window.localStorage, // Provide the storage option
  // persistSession: true,
});
// export const supabaseDetail = createClient<DatabaseUserTaskDetail>(
//   supabaseUrl,
//   supabaseAnonKey
// );

export default supabase;
