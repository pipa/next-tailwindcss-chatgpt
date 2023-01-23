import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

type SendWhatsappParams = {
  to?: string;
  body: string;
};

export const sendWhatsapp = async ({to = `whatsapp:${process.env.LM_PHONE}`, body}: SendWhatsappParams)  => {
  try {
    const messageObject = {
      from: `whatsapp:${process.env.TWILIO_WA}`,
      body,
      to
    };
    return await client.messages.create(messageObject);
  } catch (error) {
    console.log('twilio error:');
    throw error;
  }
}