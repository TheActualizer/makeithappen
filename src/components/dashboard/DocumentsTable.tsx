import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Eye, X, Check, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DocumentRow {
  id: string;
  title: string;
  description: string | null;
  notes: string | null;
  file_path: string | null;
  file_type: string | null;
  created_at: string;
}

interface EditingDocument {
  id: string;
  title: string;
  description: string;
  notes: string;
}

interface DocumentsTableProps {
  documents: DocumentRow[] | undefined;
  isLoading: boolean;
  onView: (filePath: string) => void;
}

export const DocumentsTable = ({ documents, isLoading, onView }: DocumentsTableProps) => {
  const [editingDocument, setEditingDocument] = useState<EditingDocument | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDownload = async (filePath: string) => {
    try {
      const { data } = await supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      if (data?.publicUrl) {
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = data.publicUrl;
        link.target = '_blank';
        link.download = filePath.split('/').pop() || 'document';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast({
          title: "Error",
          description: "Could not retrieve document URL",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error downloading document:", error);
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const document = documents?.find(d => d.id === documentId);
      if (!document?.file_path) throw new Error("Document not found");

      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([document.file_path]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard-documents"] });
    },
    onError: (error) => {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (document: EditingDocument) => {
      const { error } = await supabase
        .from('documents')
        .update({
          title: document.title,
          description: document.description,
          notes: document.notes,
        })
        .eq('id', document.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document updated successfully",
      });
      setEditingDocument(null);
      queryClient.invalidateQueries({ queryKey: ["dashboard-documents"] });
    },
    onError: (error) => {
      console.error("Update error:", error);
      toast({
        title: "Error",
        description: "Failed to update document",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this document?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (document: DocumentRow) => {
    setEditingDocument({
      id: document.id,
      title: document.title,
      description: document.description || "",
      notes: document.notes || "",
    });
  };

  const handleSaveEdit = () => {
    if (editingDocument) {
      updateMutation.mutate(editingDocument);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>File Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              Loading...
            </TableCell>
          </TableRow>
        ) : documents && documents.length > 0 ? (
          documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>
                {editingDocument?.id === doc.id ? (
                  <Input
                    value={editingDocument.title}
                    onChange={(e) => setEditingDocument({
                      ...editingDocument,
                      title: e.target.value,
                    })}
                  />
                ) : doc.title}
              </TableCell>
              <TableCell>
                {editingDocument?.id === doc.id ? (
                  <Input
                    value={editingDocument.description}
                    onChange={(e) => setEditingDocument({
                      ...editingDocument,
                      description: e.target.value,
                    })}
                  />
                ) : doc.description}
              </TableCell>
              <TableCell>
                {editingDocument?.id === doc.id ? (
                  <Input
                    value={editingDocument.notes}
                    onChange={(e) => setEditingDocument({
                      ...editingDocument,
                      notes: e.target.value,
                    })}
                  />
                ) : doc.notes}
              </TableCell>
              <TableCell>{doc.file_type}</TableCell>
              <TableCell>
                {new Date(doc.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="space-x-2">
                {editingDocument?.id === doc.id ? (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSaveEdit}
                      disabled={updateMutation.isPending}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingDocument(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => doc.file_path && onView(doc.file_path)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => doc.file_path && handleDownload(doc.file_path)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(doc)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(doc.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No documents found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
