import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { userChildTask, userTask } from "../components/user/types";
import supabase, { DataBase } from "./supabase";

// テーブル名
export const TABLE_NAME = "task-app";
export const TABLE_DETAIL_NAME = "task-detail-app";

// データの全取得
export const fetchDatabase = async () => {
  try {
    const { data } = await supabase
      .from(TABLE_NAME)
      .select("*")
      .order("createdAt");
    return data;
  } catch (error) {
    console.error(error);
  }
};

type InsertProps = Pick<
  DataBase["public"]["Tables"]["taskApp"]["Row"],
  "title"
>;

// データの追加
const addSupabaseData = async ({
  title,
}: InsertProps): Promise<
  PostgrestSingleResponse<DataBase["public"]["Tables"]["taskApp"]["Row"][]>
> => {
  // try {
  const result = await supabase.from(TABLE_NAME).insert({ title }).select("*");

  return result;
  // } catch (error) {
  //   console.error(error);
  // }
};

const addSupabaseUserTaskDetail = async (
  id: number,
  userChildTasks: userChildTask[]
) => {
  const arrData: DataBase["public"]["Tables"]["taskDetailApp"]["Row"][] = [];

  userChildTasks.map((userChildTask, index) => {
    arrData.push({
      id: id,
      row: index,
      timeType: userChildTask.timeType ? userChildTask.timeType : "",
      weekConfirm: userChildTask.weekConfirm ? userChildTask.weekConfirm : null,
      week: userChildTask.week ? userChildTask.week : null,
    });
  });

  await supabase.from(TABLE_DETAIL_NAME).insert(arrData).select("*");
};

export const addSupabaseUserTask = async (userTask: userTask) => {
  try {
    const result = await addSupabaseData({ title: userTask.title });
    if (result.data !== null) {
      const { id } = result.data[0];
      await addSupabaseUserTaskDetail(id, userTask.tasks);
    }
  } catch (error) {
    console.error(error);
  }
};
