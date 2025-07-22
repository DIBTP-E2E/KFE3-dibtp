export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      bids: {
        Row: {
          bid_id: number;
          bid_price: number;
          bidder_user_id: string;
          created_at: string;
          product_id: number;
        };
        Insert: {
          bid_id?: number;
          bid_price: number;
          bidder_user_id?: string;
          created_at?: string;
          product_id: number;
        };
        Update: {
          bid_id?: number;
          bid_price?: number;
          bidder_user_id?: string;
          created_at?: string;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'bids_bidder_user_id_fkey';
            columns: ['bidder_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'bids_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: true;
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          },
        ];
      };
      chat_messages: {
        Row: {
          chat_message_id: number;
          chat_room_id: string;
          created_at: string;
          is_read: boolean;
          message: string;
          sender_user_id: string;
        };
        Insert: {
          chat_message_id?: number;
          chat_room_id: string;
          created_at?: string;
          is_read?: boolean;
          message: string;
          sender_user_id: string;
        };
        Update: {
          chat_message_id?: number;
          chat_room_id?: string;
          created_at?: string;
          is_read?: boolean;
          message?: string;
          sender_user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_messages_sender_user_id_fkey';
            columns: ['sender_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      chat_rooms: {
        Row: {
          buyer_user_id: string;
          chat_room_id: string;
          created_at: string;
          product_id: number;
          seller_user_id: string;
          updated_at: string | null;
        };
        Insert: {
          buyer_user_id?: string;
          chat_room_id?: string;
          created_at: string;
          product_id: number;
          seller_user_id?: string;
          updated_at?: string | null;
        };
        Update: {
          buyer_user_id?: string;
          chat_room_id?: string;
          created_at?: string;
          product_id?: number;
          seller_user_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_rooms_buyer_user_id_fkey';
            columns: ['buyer_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
          {
            foreignKeyName: 'chat_rooms_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          },
          {
            foreignKeyName: 'chat_rooms_seller_user_id_fkey';
            columns: ['seller_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      product_images: {
        Row: {
          created_at: string;
          image_id: number;
          image_order: number;
          image_type: string;
          image_url: string;
          product_id: number;
        };
        Insert: {
          created_at?: string;
          image_id?: number;
          image_order?: number;
          image_type: string;
          image_url: string;
          product_id: number;
        };
        Update: {
          created_at?: string;
          image_id?: number;
          image_order?: number;
          image_type?: string;
          image_url?: string;
          product_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['product_id'];
          },
        ];
      };
      products: {
        Row: {
          auction_end_time: string;
          auction_start_time: string;
          created_at: string;
          current_price: number;
          decrease_unit: number;
          description: string;
          detail_address: string;
          min_price: number;
          product_id: number;
          region: string;
          seller_user_id: string;
          start_price: number;
          status: string;
          title: string;
          updated_at: string;
          view_count: number;
        };
        Insert: {
          auction_end_time: string;
          auction_start_time: string;
          created_at: string;
          current_price: number;
          decrease_unit: number;
          description: string;
          detail_address: string;
          min_price: number;
          product_id?: number;
          region: string;
          seller_user_id: string;
          start_price: number;
          status?: string;
          title: string;
          updated_at: string;
          view_count?: number;
        };
        Update: {
          auction_end_time?: string;
          auction_start_time?: string;
          created_at?: string;
          current_price?: number;
          decrease_unit?: number;
          description?: string;
          detail_address?: string;
          min_price?: number;
          product_id?: number;
          region?: string;
          seller_user_id?: string;
          start_price?: number;
          status?: string;
          title?: string;
          updated_at?: string;
          view_count?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'products_seller_user_id_fkey';
            columns: ['seller_user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          detail_address: string | null;
          nickname: string;
          profile_image: string | null;
          region: string | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          created_at: string;
          detail_address?: string | null;
          nickname: string;
          profile_image?: string | null;
          region?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Update: {
          created_at?: string;
          detail_address?: string | null;
          nickname?: string;
          profile_image?: string | null;
          region?: string | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
