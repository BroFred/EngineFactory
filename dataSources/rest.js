const rest = async ({url}) => {
    return await (await fetch(url)).json();
}


export default rest;

