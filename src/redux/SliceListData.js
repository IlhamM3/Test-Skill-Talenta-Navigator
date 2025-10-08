import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { GetAllDatalist } from "@/lib/Api";
export const fetchData = createAsyncThunk("FetchTasks", async () => {
  const data = await GetAllDatalist();
  return data;
});

const initialState = {
  tasks: null,
  isLoading: false,
  error: false,
  totalEstimated: null,
  totalActual: null,
  persentase: {
    status: {
      start: null,
      progress: null,
      waiting: null,
      pending: null,
      done: null,
      stuck: null,
    },
    priority: {
      critical: null,
      high: null,
      medium: null,
      low: null,
      best: null,
    },
    type: {
      feature: null,
      outher: null,
      bug: null,
    },
  },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.unshift(action.payload);
        state.totalEstimated += action.payload["Estimated SP"];
        state.totalActual += action.payload["Actual SP"];
        const totalData = state.tasks.length || 1;

        const Percentage = (key, value) =>
          (
            (state.tasks.filter((item) => item[key] === value).length /
              totalData) *
            100
          ).toFixed(2);

        state.persentase = {
          status: {
            start: Percentage("status", "Ready to start"),
            progress: Percentage("status", "In Progress"),
            waiting: Percentage("status", "Waiting for review"),
            pending: Percentage("status", "Pending Deploy"),
            done: Percentage("status", "Done"),
            stuck: Percentage("status", "Stuck"),
          },
          priority: {
            critical: Percentage("priority", "Critical"),
            high: Percentage("priority", "High"),
            medium: Percentage("priority", "Medium"),
            low: Percentage("priority", "Low"),
            best: Percentage("priority", "Best Effort"),
          },
          type: {
            feature: Percentage("type", "Feature Enhancements"),
            outher: Percentage("type", "Other"),
            bug: Percentage("type", "Bug"),
          },
        };
      },
      prepare({
        title,
        developer,
        priority,
        status,
        type,
        Estimated,
        Actual,
        date,
      }) {
        return {
          payload: {
            id: nanoid(),
            title,
            developer,
            priority,
            status,
            type,
            "Estimated SP": Estimated || 0,
            "Actual SP": Actual || 0,
            date: new Date(date).toDateString(),
          },
        };
      },
    },
    addTaskNoData: {
      reducer(state, action) {
        console.log(action);
        state.tasks.push(action.payload);
      },
      prepare() {
        return {
          payload: {
            id: nanoid(),
            title: "",
            developer: "",
            priority: "",
            status: "",
            type: "",
            "Estimated SP": 0,
            "Actual SP": 0,
            date: null,
          },
        };
      },
    },
    removeTask: (state, action) => {
      const item = state.tasks.find((item) => item.id === action.payload);
      state.totalEstimated -= item["Estimated SP"];
      state.totalActual -= item["Actual SP"];
      const data = state.tasks.filter((item) => item.id !== action.payload);
      state.tasks = data;
      const totalData = state.tasks.length || 1;
      const Percentage = (key, value) =>
        (
          (state.tasks.filter((item) => item[key] === value).length /
            totalData) *
          100
        ).toFixed(2);

      state.persentase = {
        status: {
          start: Percentage("status", "Ready to start"),
          progress: Percentage("status", "In Progress"),
          waiting: Percentage("status", "Waiting for review"),
          pending: Percentage("status", "Pending Deploy"),
          done: Percentage("status", "Done"),
          stuck: Percentage("status", "Stuck"),
        },
        priority: {
          critical: Percentage("priority", "Critical"),
          high: Percentage("priority", "High"),
          medium: Percentage("priority", "Medium"),
          low: Percentage("priority", "Low"),
          best: Percentage("priority", "Best Effort"),
        },
        type: {
          feature: Percentage("type", "Feature Enhancements"),
          outher: Percentage("type", "Other"),
          bug: Percentage("type", "Bug"),
        },
      };
    },
    updateTask: (state, action) => {
      console.log(action.payload);
      const { id, field, value } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        if (field === "Estimated") {
          state.totalEstimated -= task["Estimated SP"];
          task["Estimated SP"] = value;
          state.totalEstimated += Number(value);
        } else if (field === "Actual") {
          state.totalActual -= task["Actual SP"];
          task["Actual SP"] = value;
          state.totalActual += Number(value);
        } else if (field == "date") {
          task[field] = new Date(value).toDateString();
        } else if (
          field == "type" ||
          field == "status" ||
          field == "priority"
        ) {
          task[field] = value;
          const totalData = state.tasks.length || 1;
          const Percentage = (key, value) =>
            (
              (state.tasks.filter((item) => item[key] === value).length /
                totalData) *
              100
            ).toFixed(2);
          state.persentase = {
            status: {
              start: Percentage("status", "Ready to start"),
              progress: Percentage("status", "In Progress"),
              waiting: Percentage("status", "Waiting for review"),
              pending: Percentage("status", "Pending Deploy"),
              done: Percentage("status", "Done"),
              stuck: Percentage("status", "Stuck"),
            },
            priority: {
              critical: Percentage("priority", "Critical"),
              high: Percentage("priority", "High"),
              medium: Percentage("priority", "Medium"),
              low: Percentage("priority", "Low"),
              best: Percentage("priority", "Best Effort"),
            },
            type: {
              feature: Percentage("type", "Feature Enhancements"),
              outher: Percentage("type", "Other"),
              bug: Percentage("type", "Bug"),
            },
          };
        } else {
          task[field] = value;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload.data.map((item) => ({
        ...item,
        id: nanoid(),
        date: new Date().toDateString(),
      }));
      state.totalEstimated = action.payload.data.reduce(
        (sum, item) => sum + Number(item["Estimated SP"] || 0),
        0
      );
      state.totalActual = action.payload.data.reduce(
        (sum, item) => sum + Number(item["Actual SP"] || 0),
        0
      );
      const totalData = action.payload.data.length || 1;
      const Percentage = (key, value) =>
        (
          (action.payload.data.filter((item) => item[key] === value).length /
            totalData) *
          100
        ).toFixed(2);
      state.persentase = {
        status: {
          start: Percentage("status", "Ready to start"),
          progress: Percentage("status", "In Progress"),
          waiting: Percentage("status", "Waiting for review"),
          pending: Percentage("status", "Pending Deploy"),
          done: Percentage("status", "Done"),
          stuck: Percentage("status", "Stuck"),
        },
        priority: {
          critical: Percentage("priority", "Critical"),
          high: Percentage("priority", "High"),
          medium: Percentage("priority", "Medium"),
          low: Percentage("priority", "Low"),
          best: Percentage("priority", "Best Effort"),
        },
        type: {
          feature: Percentage("type", "Feature Enhancements"),
          outher: Percentage("type", "Other"),
          bug: Percentage("type", "Bug"),
        },
      };
      console.log(state.persentase);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export const { addTask, removeTask, updateTask, addTaskNoData } =
  taskSlice.actions;
export default taskSlice.reducer;
