import textfile from "./welcome.txt";

export const NAVBAR = {
    docTitle: "Document Name",
    docName: "welcome.md",
    saveText: "Save Changes",
}

export const find_date = () =>{
    let d = new Date()
    const month = d.toLocaleString('default', { month: 'long' });
    return d.getDay() + " "+month + " "+ d.getFullYear() 
}
export const WELCOMEDATA = {
    id: "welcome",
    fileName: "welcome.md",
    date: find_date(),
    currentFile: true,
    content: await (async () => {
        let fileLocation = await fetch(textfile);
        let data = await fileLocation.text()
        return data
    })()
}
