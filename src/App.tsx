import Header from './components/Header';
import Footer from './components/Footer';
import Stats from './components/Stats';
import ActiveConversation from './components/ActiveConversation';
import ModelRoster from './components/ModelRoster';
import RoutingPlaybooks from './components/RoutingPlaybooks';
import SafetyGovernance from './components/SafetyGovernance';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <Stats />
          <ActiveConversation />
        </section>

        <ModelRoster />

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <RoutingPlaybooks />
          <SafetyGovernance />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
