package com.vivifyideas.liveyounger;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static android.content.Context.POWER_SERVICE;

public class BatteryOptimizationModule extends ReactContextBaseJavaModule {

    @NonNull
    @Override
    public String getName() {
        return "BatteryOptimizationModule";
    }

    @ReactMethod
    public void checkBatteryOptimization(){
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Intent intent = new Intent();
            String packageName = MainActivity.getInstnce().getContext().getPackageName();
            PowerManager pm = (PowerManager) MainActivity.getInstnce().getContext().getSystemService(POWER_SERVICE);
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                intent.setData(Uri.parse("package:" + packageName));
                MainActivity.getInstnce().getContext().startActivity(intent);
            }
        }
    }

}
