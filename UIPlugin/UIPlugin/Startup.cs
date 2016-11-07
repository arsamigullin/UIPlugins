using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(UIPlugin.Startup))]
namespace UIPlugin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
