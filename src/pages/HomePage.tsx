import {Link} from "react-router-dom"

function HomePage() {

    return (
        <div className={"custom-bg-vanilla w-full h-[100vh] flex justify-center items-center text-center"}>
            <div>
                <h1 className={"text-6xl font-bold mb-6"}>OPAP - Online Photo Album Project</h1>
                <h2 className={"text-3xl mb-10"}>Crated by Matej Kuka and Milos Jozek</h2>
                <Link to={"/sign-in"} className={"button-primary mr-6 text-2xl"}>Sign In</Link>
                <Link to={"/sign-up"} className={"button-primary text-2xl"}>Sign Up</Link>
            </div>
        </div>
    );
}

export default HomePage;