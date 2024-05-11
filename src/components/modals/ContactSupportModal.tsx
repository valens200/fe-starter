import { showContactSupportState } from "../../atoms";
import { TextInput, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useRecoilState } from "recoil";
import LoadingSpinner from "../common/LoadingSpinner";
import ModalLayout from "../layouts/ModalLayout";
import React from "react";

export default function ContactSupportModal() {
  const [show, setShow] = useRecoilState(showContactSupportState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notifications.show({
        title: "Message Submitted",
        message: "Your message has been submitted successfully",
        color: "cyan",
        autoClose: 3000,
      });
      setShow(false);
    }, 3000);
  };

  return (
    <ModalLayout open={true} onClose={() => setShow(false)}>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold ">
          Send us a message about anything
        </h2>
        <div className="space-y-4 ">
          <TextInput
            label="What do you want to tell us about"
            placeholder="Write the topic ..."
          />
          <Textarea label="Give us a brief description" rows={4} />
          <div className="flex items-center justify-end gap-x-3">
            {/* <Button
              variant="outline"
              onClick={() => setShow(false)}
              color="gray"
            >
              close
            </Button>
            <Button
              className="w-44"
              onClick={handleSubmit}
              disabled={loading}
              color="cyan"
            >
              {loading ? <LoadingSpinner /> : <span>Submit Message</span>}
            </Button> */}
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
