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
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          project_type: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          project_type: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          project_type?: string
        }
        Relationships: []
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
          budget_range: unknown | null
          company: string | null
          complexity: Database["public"]["Enums"]["project_complexity"] | null
          created_at: string | null
          description: string
          email: string
          has_existing_codebase: boolean | null
          id: string
          integration_requirements: string[] | null
          name: string
          pain_points: string[] | null
          phone: string | null
          preferred_technologies: string[] | null
          project_type: string
          success_metrics: string[] | null
          target_completion_date: string | null
          team_size: number | null
          timeline: string
          user_id: string | null
        }
        Insert: {
          budget_range?: unknown | null
          company?: string | null
          complexity?: Database["public"]["Enums"]["project_complexity"] | null
          created_at?: string | null
          description: string
          email: string
          has_existing_codebase?: boolean | null
          id?: string
          integration_requirements?: string[] | null
          name: string
          pain_points?: string[] | null
          phone?: string | null
          preferred_technologies?: string[] | null
          project_type: string
          success_metrics?: string[] | null
          target_completion_date?: string | null
          team_size?: number | null
          timeline: string
          user_id?: string | null
        }
        Update: {
          budget_range?: unknown | null
          company?: string | null
          complexity?: Database["public"]["Enums"]["project_complexity"] | null
          created_at?: string | null
          description?: string
          email?: string
          has_existing_codebase?: boolean | null
          id?: string
          integration_requirements?: string[] | null
          name?: string
          pain_points?: string[] | null
          phone?: string | null
          preferred_technologies?: string[] | null
          project_type?: string
          success_metrics?: string[] | null
          target_completion_date?: string | null
          team_size?: number | null
          timeline?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      project_complexity: "simple" | "moderate" | "complex" | "enterprise"
      tech_stack_category:
        | "frontend"
        | "backend"
        | "database"
        | "cloud"
        | "other"
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
