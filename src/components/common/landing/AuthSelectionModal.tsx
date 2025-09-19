import gsap from "gsap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/utils/redux/appStore";
import { useCallback, useEffect, useRef } from "react";
import booking from '../../../assets/svgs/booking.svg';
import service from '../../../assets/svgs/service.svg';
import { HandleRoleSelectionFunction } from "@/utils/interface/commonInterface";
import { setsignInForm, setSignUpForm } from "@/utils/redux/slices/signFormSlice";

interface AuthSelectionModalProps {
  onClose: () => void;
}

const AuthSelectionModal: React.FC<AuthSelectionModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRoleSelection = useCallback<HandleRoleSelectionFunction>(
    (url: string) => {
      dispatch(setSignUpForm(false));
      dispatch(setsignInForm(true));
      navigate(url);
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: onClose,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--background)] p-6 rounded-2xl shadow-xl w-[90%] max-w-3xl text-center"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            onClick={() => handleRoleSelection("/book")}
            className="cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-6 h-64 hover:border-[var(--mainColor)] hover:shadow-xl transition-all duration-300"
          >
            <img
              src={booking}
              alt="Book Appointment"
              className="h-24 w-24 mb-4 transition-transform group-hover:scale-110"
            />
            <h3 className="text-lg font-semibold">
              Book an Appointment
            </h3>
            <p className="text-sm mt-2">
              Schedule a service or consultation.
            </p>
          </div>

          <div
            onClick={() => handleRoleSelection("/provider")}
            className="cursor-pointer flex flex-col items-center justify-center rounded-2xl border p-6 h-64 hover:border-[var(--mainColor)] hover:shadow-xl transition-all duration-300"
          >
            <img
              src={service}
              alt="Provide Service"
              className="h-24 w-24 mb-4 transition-transform group-hover:scale-110"
            />
            <h3 className="text-lg font-semibold">
              Provide Service
            </h3>
            <p className="text-sm mt-2">
              List your services and manage bookings.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleClose}
          className="mt-6 text-sm cursor-pointer"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default AuthSelectionModal;
