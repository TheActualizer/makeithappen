import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, TrendingUp, Clock, CreditCard } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProjectFinancials {
  actual_cost: number;
  estimated_cost: number;
  budget_spent: number;
  budget_remaining: number;
  payment_status: string;
  last_payment_date: string;
  next_payment_date: string;
  hourly_rate: number;
  total_hours_logged: number;
}

export const FinancialMetrics = ({ projectId }: { projectId?: string }) => {
  const { data: financials, isLoading } = useQuery({
    queryKey: ["project-financials", projectId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!projectId) {
        const { data: projects } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", user?.id)
          .single();
        return projects as ProjectFinancials;
      }

      const { data: project } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      return project as ProjectFinancials;
    },
  });

  const { data: expenses } = useQuery({
    queryKey: ["project-expenses", projectId],
    queryFn: async () => {
      const { data } = await supabase
        .from("project_expenses")
        .select("*")
        .eq("project_id", projectId);
      return data || [];
    },
  });

  const { data: payments } = useQuery({
    queryKey: ["project-payments", projectId],
    queryFn: async () => {
      const { data } = await supabase
        .from("project_payments")
        .select("*")
        .eq("project_id", projectId);
      return data || [];
    },
  });

  if (isLoading) {
    return <div>Loading financial metrics...</div>;
  }

  const budgetProgress = financials?.estimated_cost 
    ? (financials.budget_spent / financials.estimated_cost) * 100 
    : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount || 0);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Budget Status</p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(financials?.budget_remaining || 0)}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">remaining</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <Progress value={budgetProgress} className="mt-4" />
          <p className="text-sm text-muted-foreground mt-2">
            {budgetProgress.toFixed(1)}% of budget used
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hours Logged</p>
              <h3 className="text-2xl font-bold mt-2">
                {financials?.total_hours_logged || 0}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                @ {formatCurrency(financials?.hourly_rate || 0)}/hr
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Recent Expenses</p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(
                  expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0
                )}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {expenses?.length || 0} expenses
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Payment Status</p>
              <h3 className="text-2xl font-bold mt-2">
                {financials?.payment_status || "N/A"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Next: {financials?.next_payment_date ? formatDate(financials.next_payment_date) : "N/A"}
              </p>
            </div>
            <CreditCard className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
          <div className="space-y-4">
            {expenses?.slice(0, 5).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-muted-foreground">{expense.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(expense.amount)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(expense.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Payment History</h3>
          <div className="space-y-4">
            {payments?.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{payment.payment_method}</p>
                  <p className="text-sm text-muted-foreground">{payment.status}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(payment.amount)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(payment.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};