export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          consultation_date: string
          consultation_time: string
          created_at: string | null
          email: string
          id: string
          name: string
          project_type: string | null
          status: Database["public"]["Enums"]["appointment_status"] | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          consultation_date: string
          consultation_time: string
          created_at?: string | null
          email: string
          id?: string
          name: string
          project_type?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          consultation_date?: string
          consultation_time?: string
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          project_type?: string | null
          status?: Database["public"]["Enums"]["appointment_status"] | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      automation_logs: {
        Row: {
          attempt_number: number | null
          contact_submission_id: string | null
          created_at: string | null
          error_context: Json | null
          error_message: string | null
          id: string
          metadata: Json | null
          stage: string
          status: string
        }
        Insert: {
          attempt_number?: number | null
          contact_submission_id?: string | null
          created_at?: string | null
          error_context?: Json | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          stage: string
          status: string
        }
        Update: {
          attempt_number?: number | null
          contact_submission_id?: string | null
          created_at?: string | null
          error_context?: Json | null
          error_message?: string | null
          id?: string
          metadata?: Json | null
          stage?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_logs_contact_submission_id_fkey"
            columns: ["contact_submission_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_retry_queue: {
        Row: {
          contact_submission_id: string | null
          created_at: string | null
          id: string
          last_error: string | null
          max_retries: number | null
          next_retry_at: string | null
          payload: Json
          retry_count: number | null
          stage: string
          updated_at: string | null
        }
        Insert: {
          contact_submission_id?: string | null
          created_at?: string | null
          id?: string
          last_error?: string | null
          max_retries?: number | null
          next_retry_at?: string | null
          payload: Json
          retry_count?: number | null
          stage: string
          updated_at?: string | null
        }
        Update: {
          contact_submission_id?: string | null
          created_at?: string | null
          id?: string
          last_error?: string | null
          max_retries?: number | null
          next_retry_at?: string | null
          payload?: Json
          retry_count?: number | null
          stage?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "automation_retry_queue_contact_submission_id_fkey"
            columns: ["contact_submission_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          reading_time: number | null
          slug: string
          status: Database["public"]["Enums"]["post_status"] | null
          tags: string[] | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          reading_time?: number | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"] | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_funnel: {
        Row: {
          assigned_to: string | null
          contact_submission_id: string | null
          created_at: string | null
          current_stage: Database["public"]["Enums"]["funnel_stage"]
          id: string
          last_interaction_date: string | null
          next_action_date: string | null
          notes: string | null
          project_id: string | null
          status: Database["public"]["Enums"]["contact_status"]
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          contact_submission_id?: string | null
          created_at?: string | null
          current_stage?: Database["public"]["Enums"]["funnel_stage"]
          id?: string
          last_interaction_date?: string | null
          next_action_date?: string | null
          notes?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          contact_submission_id?: string | null
          created_at?: string | null
          current_stage?: Database["public"]["Enums"]["funnel_stage"]
          id?: string
          last_interaction_date?: string | null
          next_action_date?: string | null
          notes?: string | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["contact_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_funnel_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_funnel_contact_submission_id_fkey"
            columns: ["contact_submission_id"]
            isOneToOne: false
            referencedRelation: "contact_submissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contact_funnel_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          automation_status: string | null
          created_at: string | null
          email: string
          id: string
          last_error: string | null
          message: string
          name: string
          phone: string | null
          processed_at: string | null
          project_type: string
        }
        Insert: {
          automation_status?: string | null
          created_at?: string | null
          email: string
          id?: string
          last_error?: string | null
          message: string
          name: string
          phone?: string | null
          processed_at?: string | null
          project_type: string
        }
        Update: {
          automation_status?: string | null
          created_at?: string | null
          email?: string
          id?: string
          last_error?: string | null
          message?: string
          name?: string
          phone?: string | null
          processed_at?: string | null
          project_type?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_archived: boolean | null
          provider: Database["public"]["Enums"]["ai_provider"] | null
          provider_conversation_id: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_archived?: boolean | null
          provider?: Database["public"]["Enums"]["ai_provider"] | null
          provider_conversation_id?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_archived?: boolean | null
          provider?: Database["public"]["Enums"]["ai_provider"] | null
          provider_conversation_id?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dify_error_logs: {
        Row: {
          context: Json | null
          created_at: string | null
          error_code: string | null
          error_message: string | null
          error_stack: string | null
          id: string
          message_log_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          error_code?: string | null
          error_message?: string | null
          error_stack?: string | null
          id?: string
          message_log_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          error_code?: string | null
          error_message?: string | null
          error_stack?: string | null
          id?: string
          message_log_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dify_error_logs_message_log_id_fkey"
            columns: ["message_log_id"]
            isOneToOne: false
            referencedRelation: "dify_message_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      dify_message_logs: {
        Row: {
          conversation_id: string | null
          created_at: string | null
          dify_conversation_id: string | null
          direction: Database["public"]["Enums"]["message_direction"]
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          processing_time_ms: number | null
          request_payload: Json
          response_payload: Json | null
          status: Database["public"]["Enums"]["message_status"]
          updated_at: string | null
        }
        Insert: {
          conversation_id?: string | null
          created_at?: string | null
          dify_conversation_id?: string | null
          direction: Database["public"]["Enums"]["message_direction"]
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          processing_time_ms?: number | null
          request_payload?: Json
          response_payload?: Json | null
          status?: Database["public"]["Enums"]["message_status"]
          updated_at?: string | null
        }
        Update: {
          conversation_id?: string | null
          created_at?: string | null
          dify_conversation_id?: string | null
          direction?: Database["public"]["Enums"]["message_direction"]
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          processing_time_ms?: number | null
          request_payload?: Json
          response_payload?: Json | null
          status?: Database["public"]["Enums"]["message_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dify_message_logs_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dify_message_logs_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      dify_performance_metrics: {
        Row: {
          avg_response_time_ms: number | null
          failed_requests: number | null
          id: string
          period_end: string | null
          period_start: string | null
          successful_requests: number | null
          timestamp: string | null
          total_requests: number | null
          unique_conversations: number | null
        }
        Insert: {
          avg_response_time_ms?: number | null
          failed_requests?: number | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          successful_requests?: number | null
          timestamp?: string | null
          total_requests?: number | null
          unique_conversations?: number | null
        }
        Update: {
          avg_response_time_ms?: number | null
          failed_requests?: number | null
          id?: string
          period_end?: string | null
          period_start?: string | null
          successful_requests?: number | null
          timestamp?: string | null
          total_requests?: number | null
          unique_conversations?: number | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          created_at: string | null
          description: string | null
          file_path: string | null
          file_size: number | null
          file_type: string | null
          id: string
          notes: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          notes?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          file_path?: string | null
          file_size?: number | null
          file_type?: string | null
          id?: string
          notes?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      email_communications: {
        Row: {
          contact_funnel_id: string | null
          created_at: string | null
          email_data: Json | null
          id: string
          scheduled_for: string | null
          sent_at: string | null
          status: string
          template_id: string | null
          updated_at: string | null
        }
        Insert: {
          contact_funnel_id?: string | null
          created_at?: string | null
          email_data?: Json | null
          id?: string
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Update: {
          contact_funnel_id?: string | null
          created_at?: string | null
          email_data?: Json | null
          id?: string
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string
          template_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_communications_contact_funnel_id_fkey"
            columns: ["contact_funnel_id"]
            isOneToOne: false
            referencedRelation: "contact_funnel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_communications_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "email_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_templates: {
        Row: {
          body: string
          created_at: string | null
          funnel_stage: Database["public"]["Enums"]["funnel_stage"] | null
          id: string
          name: string
          subject: string
          trigger_event: string
          updated_at: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          funnel_stage?: Database["public"]["Enums"]["funnel_stage"] | null
          id?: string
          name: string
          subject: string
          trigger_event: string
          updated_at?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          funnel_stage?: Database["public"]["Enums"]["funnel_stage"] | null
          id?: string
          name?: string
          subject?: string
          trigger_event?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      matches: {
        Row: {
          created_at: string | null
          id: string
          meeting_time: string | null
          status: string | null
          updated_at: string | null
          user1_decision: boolean | null
          user1_id: string | null
          user2_decision: boolean | null
          user2_id: string | null
          zoom_meeting_id: string | null
          zoom_meeting_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          meeting_time?: string | null
          status?: string | null
          updated_at?: string | null
          user1_decision?: boolean | null
          user1_id?: string | null
          user2_decision?: boolean | null
          user2_id?: string | null
          zoom_meeting_id?: string | null
          zoom_meeting_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          meeting_time?: string | null
          status?: string | null
          updated_at?: string | null
          user1_decision?: boolean | null
          user1_id?: string | null
          user2_decision?: boolean | null
          user2_id?: string | null
          zoom_meeting_id?: string | null
          zoom_meeting_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_user1_id_fkey"
            columns: ["user1_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_user2_id_fkey"
            columns: ["user2_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_resources: {
        Row: {
          contact_funnel_id: string | null
          created_at: string | null
          description: string | null
          id: string
          meeting_date: string | null
          resource_type: string
          title: string
          updated_at: string | null
          uploaded_by: string | null
          url: string
        }
        Insert: {
          contact_funnel_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          meeting_date?: string | null
          resource_type: string
          title: string
          updated_at?: string | null
          uploaded_by?: string | null
          url: string
        }
        Update: {
          contact_funnel_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          meeting_date?: string | null
          resource_type?: string
          title?: string
          updated_at?: string | null
          uploaded_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "meeting_resources_contact_funnel_id_fkey"
            columns: ["contact_funnel_id"]
            isOneToOne: false
            referencedRelation: "contact_funnel"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meeting_resources_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          is_admin_message: boolean | null
          sender_id: string | null
          type: Database["public"]["Enums"]["message_type"] | null
          updated_at: string | null
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          is_admin_message?: boolean | null
          sender_id?: string | null
          type?: Database["public"]["Enums"]["message_type"] | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          is_admin_message?: boolean | null
          sender_id?: string | null
          type?: Database["public"]["Enums"]["message_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          next_steps: string[] | null
          project_id: string | null
          status: Database["public"]["Enums"]["milestone_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          next_steps?: string[] | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["milestone_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          next_steps?: string[] | null
          project_id?: string | null
          status?: Database["public"]["Enums"]["milestone_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestones_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          connections: string[] | null
          created_at: string | null
          education: Json | null
          email: string | null
          experience: Json | null
          first_name: string | null
          headline: string | null
          id: string
          last_login_at: string | null
          last_name: string | null
          location: string | null
          phone: string | null
          preferences: Json | null
          role: Database["public"]["Enums"]["user_role"] | null
          skills: string[] | null
          social_links: Json | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          connections?: string[] | null
          created_at?: string | null
          education?: Json | null
          email?: string | null
          experience?: Json | null
          first_name?: string | null
          headline?: string | null
          id: string
          last_login_at?: string | null
          last_name?: string | null
          location?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skills?: string[] | null
          social_links?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          connections?: string[] | null
          created_at?: string | null
          education?: Json | null
          email?: string | null
          experience?: Json | null
          first_name?: string | null
          headline?: string | null
          id?: string
          last_login_at?: string | null
          last_name?: string | null
          location?: string | null
          phone?: string | null
          preferences?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          skills?: string[] | null
          social_links?: Json | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      project_expenses: {
        Row: {
          amount: number
          category: string
          created_at: string | null
          date: string | null
          description: string
          id: string
          project_id: string | null
          receipt_url: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          category: string
          created_at?: string | null
          date?: string | null
          description: string
          id?: string
          project_id?: string | null
          receipt_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string | null
          date?: string | null
          description?: string
          id?: string
          project_id?: string | null
          receipt_url?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_expenses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_payments: {
        Row: {
          amount: number
          created_at: string | null
          date: string | null
          id: string
          payment_method: string | null
          project_id: string | null
          status: string
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          date?: string | null
          id?: string
          payment_method?: string | null
          project_id?: string | null
          status: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          date?: string | null
          id?: string
          payment_method?: string | null
          project_id?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_payments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tech_stack: {
        Row: {
          category: Database["public"]["Enums"]["tech_stack_category"]
          experience_level: number | null
          id: string
          project_id: string | null
          technology: string
          willing_to_change: boolean | null
        }
        Insert: {
          category: Database["public"]["Enums"]["tech_stack_category"]
          experience_level?: number | null
          id?: string
          project_id?: string | null
          technology: string
          willing_to_change?: boolean | null
        }
        Update: {
          category?: Database["public"]["Enums"]["tech_stack_category"]
          experience_level?: number | null
          id?: string
          project_id?: string | null
          technology?: string
          willing_to_change?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "project_tech_stack_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_cost: number | null
          ai_agent_requirements: string[] | null
          automation_categories: string[] | null
          automation_opportunities: string[] | null
          automation_requirements: Json | null
          budget_breakdown: Json | null
          budget_range: unknown | null
          budget_remaining: number | null
          budget_spent: number | null
          business_objectives: string[] | null
          business_procedures: Json | null
          business_processes: string[] | null
          company: string | null
          complexity: Database["public"]["Enums"]["project_complexity"] | null
          compliance_requirements: string[] | null
          created_at: string | null
          current_challenges: string[] | null
          current_manual_processes: string[] | null
          current_tech_stack: Json | null
          data_sources: string[] | null
          decision_makers: string[] | null
          description: string
          desired_automation_outcomes: string[] | null
          digital_transformation_goals: string[] | null
          digital_workforce_requirements: Json | null
          email: string
          estimated_cost: number | null
          expected_roi: string | null
          has_existing_codebase: boolean | null
          hourly_rate: number | null
          id: string
          industry_vertical: string | null
          integration_points: string[] | null
          integration_requirements: string[] | null
          key_automation_metrics: string[] | null
          last_payment_date: string | null
          name: string
          next_payment_date: string | null
          operational_policies: Json | null
          pain_points: string[] | null
          payment_schedule: string | null
          payment_status: string | null
          phone: string | null
          preferred_technologies: string[] | null
          pricing_tier: string | null
          project_constraints: string[] | null
          project_timeline: Json | null
          project_type: string[]
          stakeholders: Json | null
          success_criteria: string[] | null
          success_metrics: string[] | null
          target_completion_date: string | null
          team_size: number | null
          timeline: string
          total_hours_logged: number | null
          user_id: string | null
          workforce_simulation_scope: string | null
        }
        Insert: {
          actual_cost?: number | null
          ai_agent_requirements?: string[] | null
          automation_categories?: string[] | null
          automation_opportunities?: string[] | null
          automation_requirements?: Json | null
          budget_breakdown?: Json | null
          budget_range?: unknown | null
          budget_remaining?: number | null
          budget_spent?: number | null
          business_objectives?: string[] | null
          business_procedures?: Json | null
          business_processes?: string[] | null
          company?: string | null
          complexity?: Database["public"]["Enums"]["project_complexity"] | null
          compliance_requirements?: string[] | null
          created_at?: string | null
          current_challenges?: string[] | null
          current_manual_processes?: string[] | null
          current_tech_stack?: Json | null
          data_sources?: string[] | null
          decision_makers?: string[] | null
          description: string
          desired_automation_outcomes?: string[] | null
          digital_transformation_goals?: string[] | null
          digital_workforce_requirements?: Json | null
          email: string
          estimated_cost?: number | null
          expected_roi?: string | null
          has_existing_codebase?: boolean | null
          hourly_rate?: number | null
          id?: string
          industry_vertical?: string | null
          integration_points?: string[] | null
          integration_requirements?: string[] | null
          key_automation_metrics?: string[] | null
          last_payment_date?: string | null
          name: string
          next_payment_date?: string | null
          operational_policies?: Json | null
          pain_points?: string[] | null
          payment_schedule?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_technologies?: string[] | null
          pricing_tier?: string | null
          project_constraints?: string[] | null
          project_timeline?: Json | null
          project_type?: string[]
          stakeholders?: Json | null
          success_criteria?: string[] | null
          success_metrics?: string[] | null
          target_completion_date?: string | null
          team_size?: number | null
          timeline: string
          total_hours_logged?: number | null
          user_id?: string | null
          workforce_simulation_scope?: string | null
        }
        Update: {
          actual_cost?: number | null
          ai_agent_requirements?: string[] | null
          automation_categories?: string[] | null
          automation_opportunities?: string[] | null
          automation_requirements?: Json | null
          budget_breakdown?: Json | null
          budget_range?: unknown | null
          budget_remaining?: number | null
          budget_spent?: number | null
          business_objectives?: string[] | null
          business_procedures?: Json | null
          business_processes?: string[] | null
          company?: string | null
          complexity?: Database["public"]["Enums"]["project_complexity"] | null
          compliance_requirements?: string[] | null
          created_at?: string | null
          current_challenges?: string[] | null
          current_manual_processes?: string[] | null
          current_tech_stack?: Json | null
          data_sources?: string[] | null
          decision_makers?: string[] | null
          description?: string
          desired_automation_outcomes?: string[] | null
          digital_transformation_goals?: string[] | null
          digital_workforce_requirements?: Json | null
          email?: string
          estimated_cost?: number | null
          expected_roi?: string | null
          has_existing_codebase?: boolean | null
          hourly_rate?: number | null
          id?: string
          industry_vertical?: string | null
          integration_points?: string[] | null
          integration_requirements?: string[] | null
          key_automation_metrics?: string[] | null
          last_payment_date?: string | null
          name?: string
          next_payment_date?: string | null
          operational_policies?: Json | null
          pain_points?: string[] | null
          payment_schedule?: string | null
          payment_status?: string | null
          phone?: string | null
          preferred_technologies?: string[] | null
          pricing_tier?: string | null
          project_constraints?: string[] | null
          project_timeline?: Json | null
          project_type?: string[]
          stakeholders?: Json | null
          success_criteria?: string[] | null
          success_metrics?: string[] | null
          target_completion_date?: string | null
          team_size?: number | null
          timeline?: string
          total_hours_logged?: number | null
          user_id?: string | null
          workforce_simulation_scope?: string | null
        }
        Relationships: []
      }
      sprints: {
        Row: {
          completed_at: string | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          milestone_id: string | null
          next_steps: string[] | null
          project_id: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["sprint_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          milestone_id?: string | null
          next_steps?: string[] | null
          project_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["sprint_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          milestone_id?: string | null
          next_steps?: string[] | null
          project_id?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["sprint_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sprints_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sprints_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          dependencies: string[] | null
          description: string | null
          due_date: string | null
          estimated_hours: number | null
          id: string
          next_steps: string[] | null
          priority: string | null
          sprint_id: string | null
          status: Database["public"]["Enums"]["milestone_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          next_steps?: string[] | null
          priority?: string | null
          sprint_id?: string | null
          status?: Database["public"]["Enums"]["milestone_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          dependencies?: string[] | null
          description?: string | null
          due_date?: string | null
          estimated_hours?: number | null
          id?: string
          next_steps?: string[] | null
          priority?: string | null
          sprint_id?: string | null
          status?: Database["public"]["Enums"]["milestone_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_sprint_id_fkey"
            columns: ["sprint_id"]
            isOneToOne: false
            referencedRelation: "sprints"
            referencedColumns: ["id"]
          },
        ]
      }
      user_matching_preferences: {
        Row: {
          bio: string | null
          created_at: string | null
          gender_identity: Database["public"]["Enums"]["gender_identity"]
          id: string
          interests: string[] | null
          is_active: boolean | null
          seeking_gender: Database["public"]["Enums"]["gender_identity"][]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          gender_identity: Database["public"]["Enums"]["gender_identity"]
          id?: string
          interests?: string[] | null
          is_active?: boolean | null
          seeking_gender: Database["public"]["Enums"]["gender_identity"][]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          gender_identity?: Database["public"]["Enums"]["gender_identity"]
          id?: string
          interests?: string[] | null
          is_active?: boolean | null
          seeking_gender?: Database["public"]["Enums"]["gender_identity"][]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_matching_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      automation_health_metrics: {
        Row: {
          attempt_count: number | null
          error_count: number | null
          stage: string | null
          status: string | null
          time_bucket: string | null
        }
        Relationships: []
      }
      dify_analytics: {
        Row: {
          avg_processing_time: number | null
          direction: Database["public"]["Enums"]["message_direction"] | null
          error_count: number | null
          message_count: number | null
          status: Database["public"]["Enums"]["message_status"] | null
          time_bucket: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ai_provider: "openai" | "dify" | "anthropic" | "google"
      appointment_status: "scheduled" | "completed" | "cancelled"
      automation_category:
        | "billing_payroll"
        | "internal_operations"
        | "email_automation"
        | "marketing"
        | "content_generation"
        | "seo"
        | "chatbot"
        | "workflow_automation"
        | "mathematical_calculations"
        | "analytics_reporting"
        | "trend_analysis"
        | "data_manipulation"
        | "digital_workforce"
        | "business_simulation"
        | "automated_accounting"
        | "legal_automation"
        | "policy_automation"
        | "procedure_automation"
        | "agent_orchestration"
      contact_status:
        | "new"
        | "contacted"
        | "qualified"
        | "proposal"
        | "negotiation"
        | "won"
        | "lost"
      funnel_stage:
        | "inquiry"
        | "consultation_scheduled"
        | "consultation_completed"
        | "project_started"
        | "onboarding"
        | "active"
        | "completed"
      gender_identity: "male" | "female" | "other"
      message_direction: "outbound" | "inbound"
      message_status: "pending" | "sent" | "received" | "failed" | "processed"
      message_type: "text" | "system" | "ai"
      milestone_status: "not_started" | "in_progress" | "completed" | "blocked"
      post_status: "draft" | "published" | "archived"
      project_complexity: "simple" | "moderate" | "complex" | "enterprise"
      sprint_status: "planned" | "active" | "completed" | "archived"
      tech_stack_category:
        | "frontend"
        | "backend"
        | "database"
        | "cloud"
        | "other"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
