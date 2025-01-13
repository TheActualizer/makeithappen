import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { DocumentUploadForm } from "./DocumentUploadForm";
import { DocumentsTable } from "./DocumentsTable";
import { DocumentPreviewDialog } from "./DocumentPreviewDialog";

interface DashboardDocumentsProps {
  isAdmin?: boolean;
}

export const DashboardDocuments = ({ isAdmin }: DashboardDocumentsProps) => {
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: documents, isLoading } = useQuery({
    queryKey: ["dashboard-documents", isAdmin],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const query = supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isAdmin && user?.email) {
        query.eq("user_id", user.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleView = async (filePath: string) => {
    try {
      const { data } = await supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        setViewingDocument(data.publicUrl);
      } else {
        toast({
          title: "Error",
          description: "Could not retrieve document URL",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error getting document URL:", error);
      toast({
        title: "Error",
        description: "Failed to get document URL",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <DocumentUploadForm />

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {isAdmin ? "All Documents" : "My Documents"}
        </h2>
        <DocumentsTable 
          documents={documents}
          isLoading={isLoading}
          onView={handleView}
        />
      </Card>

      <DocumentPreviewDialog 
        url={viewingDocument} 
        onClose={() => setViewingDocument(null)} 
      />
    </div>
  );
};