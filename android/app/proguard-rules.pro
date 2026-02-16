# Capacitor WebView - preserve JavaScript interface
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep Capacitor core classes
-keep class com.getcapacitor.** { *; }
-keep class com.sternberg.lovescale.** { *; }

# Keep AndroidX classes used by Capacitor
-keep class androidx.core.content.FileProvider { *; }

# Keep Capacitor BridgeActivity
-keepclassmembers class * extends com.getcapacitor.BridgeActivity {
    public *;
}

# Preserve line numbers for debugging crash reports
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
