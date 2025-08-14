import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Plus, ListTodo } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  // Redirect to dashboard if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            TaskMaster
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The beautiful and simple way to manage your tasks. Stay organized, boost productivity, and achieve your goals.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 transition-opacity text-lg px-8 py-3"
          >
            <a href="/auth">Get Started</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-card text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Easy Task Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create tasks with titles and descriptions in seconds. Simple, intuitive, and efficient.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <ListTodo className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Smart Organization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Automatically organize your tasks into pending and completed categories for better clarity.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardHeader>
              <div className="mx-auto mb-4 h-12 w-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mark tasks as complete and watch your productivity soar. See your achievements at a glance.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Ready to transform how you manage tasks?
          </p>
          <Button variant="outline" asChild>
            <a href="/auth">Sign In</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
