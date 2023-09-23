import { NextResponse } from "next/server";
import { OpenAIStream } from "@/lib/openai";
export const runtime= "edge"
export async function POST(req:Request) {
    const {title}=await req.json();
    try{
        const stream=await OpenAIStream({
            model:"gpt-3.5-turbo",
            messages:[
                {
                    content:`"You are a senior software developer , you task is to teach a new software developer. You have clarity about all technologies. Now split the task of building a "task management application using nodejs" into smaller parts and provide chatgpt prompts for each smaller task so that from start to beginning and make the learning curve as less steeper as possible"`,
                    role:"system",
                },
                {
                    content:title,
                    role:"user"
                },{
                    content:"Task management application using nodejs",
                    role:"user"
                },{
                    content:`1. Setting Up the Node.js Project: Prompt: How do you create a new Node.js project on your local machine? 2. Creating an Express.js Server: Prompt: Explain the steps to set up an Express.js server in a Node.js project.3. Creating RESTful API Endpoints:Prompt: Describe how you define routes for creating, reading, updating, and deleting tasks in Express.js.4. Designing the Task Data Model: Prompt: What properties should be included in a task object for this application? 5. Handling Task Creation: Prompt: How do you validate and sanitize user input when creating a task? 6. Retrieving and Displaying Tasks:Prompt: What route and HTTP method would you use to fetch tasks from the server? 7. Updating Task Status:Prompt: Explain how you handle updating the status of a task from "todo" to "completed."8. Deleting Tasks: Prompt: How do you implement a feature that allows users to delete tasks? 9. Implementing Data Storage:   Prompt: How can you store task data on the server, and what storage mechanisms or databases could you use?10. Implementing User Authentication:- Prompt: What steps are involved in adding user authentication to the Task Management Application?11. Error Handling and Validation: - Prompt: How do you handle errors and validation for user input and API requests in the application?`,
                    role:"assistant",
                },
                {content:title,role:"user"}
            ],
            temperature:0.88,
            max_tokens:100,
            stream:true,
        })
        return new Response(stream);
    }catch(err){
        NextResponse.json({msg:err});
        console.log(err);
    }
}