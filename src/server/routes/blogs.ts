import * as express from 'express';
import DB from "../db"


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let blogs = await DB.Blogs.all();
        console.log(blogs)
        res.json(blogs)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
});
router.get("/:id?", async (req: express.Request,res: express.Response) =>{
    
        try{
            const id: number = Number(req.params.id);
            const blog = await DB.Blogs.one(id);
            const blogtags = await DB.BlogTags.one(id);
            blog[0].tags = blogtags[0]
            res.json(blog[0]);
        }catch (error){
            console.log(error);
            res.status(500).send(error)
        }
   
})
router.post("/", async (req, res)=> {
    try{
        const author = req.body.author;
        const blog= req.body.blog;
        const blogtags = req.body.blog.tags

        const  newAuthor = await DB.Authors.insert(author.name, author.email)
        const newBlog = await DB.Blogs.insert(blog.title, blog.content, newAuthor.insertId);
        const newBlogTags= await DB.BlogTags.insert(newBlog.insertId, blogtags)
        
        res.status(200).send(`
        author created with id:${newAuthor.insertId}
        blog created with id: ${newBlog.insertId}
        
        `);
    }catch (error){
        console.error(error)
        res.status(500).send (error)
    }
})

router.put ("/:id", async (req: express.Request, res: express.Response) => {
    try{
        const title: string= req.body.title
        const content: string =req.body.content
         const id=Number(req.params.id);

       
        await DB.Blogs.update (title, content, id);
        res.status(200).send(`blog edited at id:${id}`)
    }catch(error){
        console.error(error);
    res.status(500).send(error);
}
})

router.delete ("/:id", async (req: express.Request, res: express.Response)=>{
    try{
const id = Number(req.params.id);
await DB.BlogTags.deleteBlogTags(id);
await DB.Blogs.deleteBlog(id);


res.status(200).send(`blog deleted at id: ${id}`)
    }catch (error) {
        console.error(error);
        res.status(500).send(error)
    }
})


export default router;