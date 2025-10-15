import './App.css';
import { Landing } from '@/components/Landing/Landing';
import { Navbar } from '@/components/Navbar/Navbar';
import { Projects } from '@/components/Projects/Projects';

function App() {
  return (
    <div className="relative w-screen bg-neutral-50 pb-52">
      <Navbar />
      <Landing />
      <Projects />
    </div>
  );
}

export default App;
