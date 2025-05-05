import { MailService } from "../services/mail.services.js";

const mailService = new MailService();

class MailController {
  constructor() {}

  sendTestMail = async (req, res) => {
    try {
      const { email } = req.body;
      const dummyTicket = {
        code: "TEST1234",
        purchase_datetime: new Date().toLocaleString(),
        amount: 999,
      };

      const info = await mailService.sendPurchaseConfirmation(dummyTicket, email);

      res.status(200).send({
        status: "success",
        message: "Correo enviado correctamente",
        infoId: info.messageId,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ status: "error", message: "Error enviando correo" });
    }
  };
}

export default new MailController();
