import DashboardHeader from "@/components/DashboardHeader";
import TodaysFocus from "@/components/TodaysFocus";
import AttainmentProgress from "@/components/AttainmentProgress";
import UpdatesCard from "@/components/UpdatesCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        <DashboardHeader userName="Eliza" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TodaysFocus />
            <AttainmentProgress />
          </div>
          
          <div className="lg:col-span-1">
            <UpdatesCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
