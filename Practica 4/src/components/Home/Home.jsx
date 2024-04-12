import './Home.css';
import Cards from './Cards'

export function Home() {
  return (
    <div className='text-light'>
      <h1 className = 'titulo'>Bienvenido a ClonBuster</h1>
      <Cards/>
    </div>
  );
}