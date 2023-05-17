import Navigation from "../../components/Navigation";
import AlbumsPreview from "../../components/AlbumsPreview";

function UserHomePage() {

    return (
        <div className={"custom-bg-vanilla"}>
            <Navigation/>
            <AlbumsPreview/>
        </div>
    );
}

export default UserHomePage;