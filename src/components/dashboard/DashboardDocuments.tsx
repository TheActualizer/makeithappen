import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
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
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Pencil, Trash2, Eye, X, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface DashboardDocumentsProps {
  isAdmin?: boolean;
}

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

export const DashboardDocuments = ({ isAdmin }: DashboardDocumentsProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [viewingDocument, setViewingDocument] = useState<string | null>(null);
  const [editingDocument, setEditingDocument] = useState<EditingDocument | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
      return data as DocumentRow[];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("No file selected");
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          title,
          description,
          notes,
          file_path: filePath,
          file_type: file.type,
          file_size: file.size,
          user_id: user.id,
        });

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });
      setTitle("");
      setDescription("");
      setNotes("");
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ["dashboard-documents"] });
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (documentId: string) => {
      const document = documents?.find(d => d.id === documentId);
      if (!document?.file_path) throw new Error("Document not found");

      // Delete the file from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([document.file_path]);

      if (storageError) throw storageError;

      // Delete the database record
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    uploadMutation.mutate();
  };

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
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Document Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload Document"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {isAdmin ? "All Documents" : "My Documents"}
        </h2>
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
            ) : (
              documents?.map((doc) => (
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
                          onClick={() => doc.file_path && handleView(doc.file_path)}
                        >
                          <Eye className="h-4 w-4" />
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
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!viewingDocument} onOpenChange={() => setViewingDocument(null)}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>
              You can scroll through the document below
            </DialogDescription>
          </DialogHeader>
          {viewingDocument && (
            <div className="flex-1 overflow-hidden rounded-md">
              <iframe
                src={viewingDocument}
                className="w-full h-[calc(90vh-120px)]"
                title="Document Preview"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
