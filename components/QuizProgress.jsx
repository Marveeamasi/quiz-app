import { questions } from "@/utils/questions";

export default function QuizProgress({ progress }) {
    return (
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-[#5122a227] rounded-full h-2.5">
          <div
            className="purpleBg h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2">
          Question {Math.ceil(progress / (100 / questions.length))} of {questions.length}
        </p>
      </div>
    );
  }