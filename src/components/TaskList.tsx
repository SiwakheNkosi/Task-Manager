import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Task } from "@/hooks/useTasks";
import { Trash2, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggle: (taskId: string, completed: boolean) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

export const TaskList = ({ tasks, loading, onToggle, onDelete }: TaskListProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <CheckCircle2 className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">No tasks yet</h3>
          <p className="text-muted-foreground text-center">
            Create your first task above to get started!
          </p>
        </CardContent>
      </Card>
    );
  }

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Pending Tasks ({pendingTasks.length})</h2>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={onToggle} 
                onDelete={onDelete} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <h2 className="text-xl font-semibold">Completed Tasks ({completedTasks.length})</h2>
          </div>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={onToggle} 
                onDelete={onDelete} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string, completed: boolean) => Promise<void>;
  onDelete: (taskId: string) => Promise<void>;
}

const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const handleToggle = () => {
    onToggle(task.id, !task.completed);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Card className={cn(
      "shadow-card transition-all duration-200 hover:shadow-elegant",
      task.completed && "opacity-75"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            id={task.id}
            checked={task.completed}
            onCheckedChange={handleToggle}
            className="mt-1 flex-shrink-0"
          />
          
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "font-medium",
              task.completed && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={cn(
                "text-sm text-muted-foreground mt-1",
                task.completed && "line-through"
              )}>
                {task.description}
              </p>
            )}
            
            <p className="text-xs text-muted-foreground mt-2">
              Created {format(new Date(task.created_at), "MMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            className="flex-shrink-0 h-8 w-8 text-destructive hover:text-destructive-foreground hover:bg-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};