import { useHello } from "@/hooks/use-hello";
import { motion } from "framer-motion";
import { Sparkles, RefreshCcw, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data, isLoading, isError, refetch, isFetching } = useHello();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Very subtle background ambient decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
      </div>

      <main className="relative z-10 flex flex-col items-center max-w-2xl w-full text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div data-testid="status-system" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/50 text-xs font-medium text-secondary-foreground shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Online
          </div>
        </motion.div>

        {/* Main Content Area */}
        <div className="min-h-[160px] flex flex-col items-center justify-center w-full">
          {isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="flex flex-col items-center gap-4"
            >
              <Activity className="w-8 h-8 text-muted-foreground animate-pulse" />
              <div className="h-12 w-64 bg-secondary/50 animate-pulse rounded-lg" />
            </motion.div>
          ) : isError ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-destructive/5 border border-destructive/10"
            >
              <p data-testid="text-error" className="text-destructive font-medium" style={{ fontFamily: 'var(--font-sans)' }}>
                Unable to connect to the server.
              </p>
              <Button 
                data-testid="button-retry"
                variant="outline" 
                size="sm" 
                onClick={() => refetch()}
                className="gap-2 rounded-full"
              >
                <RefreshCcw className="w-4 h-4" /> Try Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative group"
            >
              <Sparkles className="absolute -top-6 -right-6 w-5 h-5 text-muted-foreground/30 group-hover:text-primary/40 transition-colors duration-500" />
              <h1 
                data-testid="text-hello-message"
                style={{ fontFamily: 'var(--font-display)' }} 
                className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-balance text-foreground"
              >
                {data?.message || "Hello, World!"}
              </h1>
            </motion.div>
          )}
        </div>

        {/* Footer actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex items-center justify-center"
        >
          <Button 
            data-testid="button-refresh"
            variant="ghost" 
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading || isFetching}
            className="text-muted-foreground rounded-full gap-2"
          >
            <RefreshCcw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh Message
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
