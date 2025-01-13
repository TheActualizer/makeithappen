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

interface DashboardFormsProps {
  isAdmin?: boolean;
}

export const DashboardForms = ({ isAdmin }: DashboardFormsProps) => {
  const { data: forms, isLoading } = useQuery({
    queryKey: ["dashboard-forms", isAdmin],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const query = supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (!isAdmin && user?.email) {
        query.eq("email", user.email);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {isAdmin ? "All Form Submissions" : "My Form Submissions"}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Project Type</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            forms?.map((form) => (
              <TableRow key={form.id}>
                <TableCell>{form.name}</TableCell>
                <TableCell>{form.email}</TableCell>
                <TableCell>{form.project_type}</TableCell>
                <TableCell>
                  {new Date(form.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};