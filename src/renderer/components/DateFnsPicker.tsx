import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';

/*
    Default date of antd use momentjs
    Moment has its own date object that is not serializable 
    and therefor can't be send to ipcMain.

    The following DatePicker component use dateFns that has the 
    advantage of using the default javascript Date object which is serializable.
*/

export const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);
