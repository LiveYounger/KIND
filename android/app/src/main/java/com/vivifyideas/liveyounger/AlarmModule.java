package com.vivifyideas.liveyounger;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AlarmModule extends ReactContextBaseJavaModule{

    public ReactApplicationContext reactApplicationContext;

    public static AlarmModule instance = null;

    AlarmModule(ReactApplicationContext context) {
        super(context);
        this.reactApplicationContext = context;
        instance = this;
    }


    @NonNull
    @Override
    public String getName() {
        return "AlarmModule";
    }

    private AlarmManager alarmMgr;
    private PendingIntent alarmIntent;

    @ReactMethod
    public void setAlarm(int time, String type) {
        Log.d("ALARM_TIME123",SystemClock.elapsedRealtime()+time+" type"+type);
        int requestCode = type == "BEDTIME" ? 0 : 1;
        alarmMgr =
                (AlarmManager) MainActivity.getInstnce().getContext().getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(MainActivity.getInstnce().getContext(),AlarmReceiver.class);
        alarmIntent = PendingIntent.getBroadcast(reactApplicationContext, requestCode, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            alarmMgr.setExactAndAllowWhileIdle(AlarmManager.ELAPSED_REALTIME_WAKEUP,
                    SystemClock.elapsedRealtime() +
                            time, alarmIntent);
        }
    }

    @ReactMethod
    public void cancelAlarm(String type) {
        int requestCode = type == "BEDTIME" ? 0 : 1;
        alarmMgr =
                (AlarmManager) MainActivity.getInstnce().getContext().getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(MainActivity.getInstnce().getContext(),AlarmReceiver.class);
        alarmIntent = PendingIntent.getBroadcast(reactApplicationContext, requestCode, intent, PendingIntent.FLAG_UPDATE_CURRENT);
        alarmMgr.cancel(alarmIntent);
    }

    
    
}
