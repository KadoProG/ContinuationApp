"use client";

import { styled } from "styled-components";
import { useState } from "react";
import {
  ButtonOrigin,
  ElementIconPlus,
  InputTextOrigin,
} from "./htmlOriginElements";
import FormQuestionChild from "./form_question_child";
import { userChildTask, userTask } from "./types";
import { addSupabaseUserTask } from "../../lib/supabaseFunctions";

const DivForm = styled.div`
  padding: 10px;
  margin: 10px;
  border: 1px solid var(--color_theme_line);
`;

const LabelText = styled.p`
  font-size: 14px;
  color: gray;
`;

const LineDivider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--color_theme_line);
  margin: 30px 0;
`;

const FormQuestions = () => {
  const [userTask, setUserTask] = useState<userTask>({
    title: "始発電車ルーティン",
    tasks: [{ name: "子要素のタイトル", routineIndex: 0, timeType: "week" }],
  });

  const handleRoutineChange = (row: number, handleUserTask: userChildTask) => {
    const newTasks = userTask.tasks.map((userChildTask, index) => {
      if (row === index) return handleUserTask;
      return userChildTask;
    });

    const newUserTask = { ...userTask, tasks: newTasks };
    setUserTask(newUserTask);
  };

  const handleTitleChange = (title: string) => {
    const newUserTask = { ...userTask, title: title };
    setUserTask(newUserTask);
  };

  const handleAddClick = () => {
    const newUserChildTask: userChildTask[] = [
      ...userTask.tasks,
      { name: "", routineIndex: 0, timeType: "week" },
    ];

    setUserTask({ ...userTask, tasks: newUserChildTask });
  };

  const deleteUserChildTask = (row: number) => {
    const newUserChildTask = userTask.tasks.filter(
      (task, index) => index !== row
    );

    setUserTask({ ...userTask, tasks: newUserChildTask });
  };

  const handleSubmit = async () => {
    await addSupabaseUserTask(userTask);
  };

  return (
    <DivForm>
      <div>
        <LabelText>タスクのタイトル</LabelText>
        <InputTextOrigin
          $fontSize={20}
          type="text"
          placeholder="タスク名"
          value={userTask.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
      </div>
      <LineDivider />
      <LabelText>タスクの子プロセス</LabelText>
      {userTask.tasks.map((userChildTask, index) => {
        return (
          <FormQuestionChild
            key={index}
            taskCount={index}
            userChildTask={userChildTask}
            setUserChildTask={(userChildTask) =>
              handleRoutineChange(index, userChildTask)
            }
            deleteUserChildTask={() => deleteUserChildTask(index)}
          />
        );
      })}
      <ButtonOrigin $width={200} onClick={() => handleAddClick()}>
        <ElementIconPlus height={28} />
        <span>小タスクを追加</span>
      </ButtonOrigin>
      <ButtonOrigin onClick={handleSubmit}>送信する</ButtonOrigin>
    </DivForm>
  );
};

export default FormQuestions;
