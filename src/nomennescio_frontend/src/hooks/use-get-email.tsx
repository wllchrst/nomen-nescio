import { EmailService } from "../service/email-service";
import { IEmail } from "../interfaces/email-interface";
import { useState, useEffect } from "react";

export const useGetUserEmail = (id: string) => {
    const [emails, setEmails] = useState<IEmail[]>([]);

    useEffect(() => {
        const fetchEmails = async () => {
            const emailService = new EmailService();
            const emails = await emailService.getUserEmail(id);
            setEmails(emails);
        };

        fetchEmails();
    }, [id]);

    return { emails};
};


export const useGetEmaiLDetail = (email_id: string) => {
    const [emailDetails, setEmailDetails] = useState<object[]>([]);
    
    useEffect(() => {
        const fetchEmailDetails = async () => {
            const emailService = new EmailService();
            const emailDetails = await emailService.getEmailDetail(email_id);
            setEmailDetails(emailDetails);
        };
        
        fetchEmailDetails();
    }, [email_id]);
    
    return { emailDetails };
};
