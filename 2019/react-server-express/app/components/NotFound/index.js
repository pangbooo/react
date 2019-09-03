export default function NotFound({staticContext={}}){
    staticContext.status = 404;
    return <h2>Oops, nothing here!</h2>
}