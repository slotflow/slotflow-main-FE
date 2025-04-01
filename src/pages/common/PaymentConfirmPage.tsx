import { gsap } from "gsap";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import CommonButton from "@/components/common/CommonButton";
import { saveSubscription } from "@/utils/apis/provider.api";
import { PaymentConfirmPageProps } from "@/utils/interface/providerInterface";

const PaymentConfirmPage: React.FC<PaymentConfirmPageProps> = ({ status }) => {

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  console.log("session id : ",sessionId);

  useEffect(() => {
    gsap.fromTo(
      ".icon",
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
    );
  }, []);

  const save = async () => {
    if(!sessionId) return;
    const response = await saveSubscription(sessionId);
    toast.success(response.message);
  }

  useEffect(() => {
    save();
  },[])

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="p-8 flex flex-col items-center text-center">
        <div className="icon text-[var(--mainColor)]">
          {status ? (
            <CheckCircle size={80} strokeWidth={1} />
          ) : (
            <XCircle size={80} strokeWidth={1} />
          )}
        </div>
        <h1 className="text-2xl font-bold mt-4">{status ? "Payment Successful!" : "Payment Failed!"}</h1>
        <p className="mt-2">{status ? "Your payment was processed successfully." : "There was an issue with your payment. Please try again."}</p>
        <div className="my-4">
          <CommonButton text={"Go to home"} onClick={() => window.location.href = "/provider/subscription"} />
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmPage;