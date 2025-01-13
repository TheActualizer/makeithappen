import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface DashboardDocumentsProps {
  isAdmin?: boolean;
}

export const DashboardDocuments = ({ isAdmin }: DashboardDocumentsProps) => {
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

  return (
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            documents?.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.title}</TableCell>
                <TableCell>{doc.description}</TableCell>
                <TableCell>{doc.notes}</TableCell>
                <TableCell>{doc.file_type}</TableCell>
                <TableCell>
                  {new Date(doc.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};