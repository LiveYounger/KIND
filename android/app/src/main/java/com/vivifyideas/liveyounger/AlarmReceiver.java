package com.vivifyideas.liveyounger;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.ContextWrapper;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.os.Parcelable;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import static com.facebook.FacebookSdk.getApplicationContext;

public class AlarmReceiver extends BroadcastReceiver {

    public static ReactApplicationContext reactApplicationContext;

    @Override
    public void onReceive(Context context, Intent intent) {
        Toast.makeText(context, "ALARM", Toast.LENGTH_LONG).show();
        Log.d("CALLING","HEADLESS TASK");
        Context reactContext = getApplicationContext();
        Intent myIntent = new Intent(context, AlarmEventService.class);
        context.startService(myIntent);
        HeadlessJsTaskService.acquireWakeLockNow(reactContext);
    }

}
