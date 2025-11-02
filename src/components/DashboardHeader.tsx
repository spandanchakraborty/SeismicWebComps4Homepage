import { format } from "date-fns";

interface DashboardHeaderProps {
  userName?: string;
}

const DashboardHeader = ({ userName = "User" }: DashboardHeaderProps) => {
  const currentDate = format(new Date(), "EEEE MMMM dd, yyyy");
  
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-foreground mb-1">
        Good morning, {userName}!
      </h1>
      <p className="text-muted-foreground">{currentDate}</p>
    </header>
  );
};

export default DashboardHeader;
