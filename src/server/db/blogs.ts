import { Query } from "./index";

const all = async () => Query("select authors.name, blogs.title, blogs.content, blogs.id from blogs inner join authors on (blogs.authorid=authors.id)")
const one = async (id: any) => Query(`SELECT blogs.* FROM blogs JOIN Authors on Authors.id=Blogs.authorid Where Blogs.id=${id}`);
const insert = async (title: string, content: string, authorid: number) => Query(`INSERT INTO Blogs(title,content,authorid) VALUE (?,?,?);`, [title, content, Number(authorid)]);
const update = async (title: string, content: string, id: number) => Query(`
    UPDATE Blogs 
        SET title = ?, 
        content = ? 
    WHERE Blogs.id = ?
`, [title, content, id]);
const deleteBlog = async (id: number) => Query("DELETE FROM blogs WHERE Blogs.id=?;", [id]);

// const insert= (title: string, content: string, authorid: number)=> Query(
//     insert into blogs (title,content, authorid)
// )

export default {

    all,
    one,
    insert,
    update,
    deleteBlog
}