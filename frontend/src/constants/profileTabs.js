import { Icons } from "../components/icons/Icons";

const SECTIONS = [
    {
      title: "Settings",
      tabs: [
        {
          label: "Personal information", 
          icon: "person-circle-outline", 
          iconType: Icons.Ionicons
        },
        {
            label: "Display settings", 
            icon: "settings-display", 
            iconType: Icons.MaterialIcons
        },
        {
          label: "Payments & payouts", 
          icon: "cash-outline", 
          iconType: Icons.Ionicons
        },
        {
          label: "Login & security", 
          icon: "shield-outline", 
          iconType: Icons.Ionicons
        },
        {
          label: "Accessibility", 
          icon: "universal-access", 
          iconType: Icons.FontAwesome5
        },
        {
          label: "Translation", 
          icon: "translate", 
          iconType: Icons.MaterialCommunityIcons
        },
        {
          label: "Notifications", 
          icon: "notifications-outline", 
          iconType: Icons.Ionicons
        },
        {
          label: "Privacy & sharing", 
          icon: "lock", 
          iconType: Icons.SimpleLineIcons
        }
      ]
    },
    {
        title: "Statistics",
        tabs: [
          {
            label: "History", 
            icon: "history", 
            iconType: Icons.MaterialCommunityIcons
          },
          {
            label: "Performance", 
            icon: "graph", 
            iconType: Icons.SimpleLineIcons
          }
        ]
    },
    {
        title: "Support",
        tabs: [
          {
            label: "Visit the Help Center", 
            icon: "help-circle", 
            iconType: Icons.Feather
          },
          {
            label: "How Quran Quizlet works", 
            icon: "logo", 
            iconType: Icons.IcoMoon
          },
          {
            label: "Give us feedback", 
            icon: "comment-edit-outline", 
            iconType: Icons.MaterialCommunityIcons
          }
        ]
    },
    {
        title: "Legal",
        tabs: [
          {
            label: "Terms of Service", 
            icon: "document-outline", 
            iconType: Icons.Ionicons
          },
          {
            label: "Privacy Policy", 
            icon: "privacy-tip", 
            iconType: Icons.MaterialIcons
          },
          {
            label: "Your Privacy Choices", 
            icon: "lock-check-outline", 
            iconType: Icons.MaterialCommunityIcons
          },
          {
            label: "Open source licenses", 
            icon: "license", 
            iconType: Icons.MaterialCommunityIcons
          }
        ]
    }
  ]
  export { SECTIONS };
