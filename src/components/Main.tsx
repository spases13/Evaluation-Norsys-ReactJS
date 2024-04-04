import "./styles/Main.scss";

const Main = ({children , className} : any) => {
  return (
      <main className={`Main ${className}`}>
          {children}
      </main>
  );
};

export default Main;
