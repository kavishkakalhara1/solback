import mongoose from 'mongoose';

const IssueSchema = new mongoose.Schema({
    
    
    issueid: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
   
    status: {
        type: String,
        required: true
    },
    
    priority: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    reportedby: {
        type: String,
        required: true
    },
    assignedto: {
        type: String,
        required: true
    },
    attachments: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});

const Issue = mongoose.model("Issue", IssueSchema);

export default Issue;