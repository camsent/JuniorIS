import { Tabs } from "expo-router";

export default function TabLayout() {
  return ( 
    <Tabs>
      <Tabs.Screen 
      name="index"
      options={{
        title: "Stillness",
      }}
      />
      <Tabs.Screen
      name="reflection"
      options={{
        title: "Reflection",
      }}
      />
    </Tabs>
  )
}
