using System;
using System.Linq;
using Nuke.Common;
using Nuke.Common.CI;
using Nuke.Common.Execution;
using Nuke.Common.IO;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tooling;
using Nuke.Common.Utilities.Collections;
using static Nuke.Common.Tools.DotNet.DotNetTasks;
using static Nuke.Common.EnvironmentInfo;
using static Nuke.Common.IO.FileSystemTasks;
using static Nuke.Common.IO.PathConstruction;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Git;

partial class Build : NukeBuild
{
    public static int Main () => Execute<Build>(x => x.Compile);

    [Solution(GenerateProjects = true)]
    readonly Solution Solution;
    [GitRepository]
    readonly GitRepository GitRepository;

    [PathVariable("yarn")]
    readonly Tool Yarn;

    [Parameter("Configuration to build - Default is 'Debug' (local) or 'Release' (server)")]
    readonly Configuration Configuration = IsLocalBuild ? Configuration.Debug : Configuration.Release;

    static AbsolutePath Frontend => RootDirectory / "frontend";

    Target Compile => _ => _
        .Executes(() =>
        {
            DotNetBuild(c => c.SetProjectFile(Solution.WoodMagic));
        });

    // dotnet run -- schema export --output ../../frontend/schema.graphql
    Target GenerateGraphQLScheme => _ => _
        .Executes(() =>
        {
            DotNetRun(c => c
                .SetProjectFile(Solution.WoodMagic)
                .AddApplicationArguments("schema")
                .AddApplicationArguments("export")
                .AddApplicationArguments("--output")
                .AddApplicationArguments("../../frontend/schema.graphql"));

            Yarn("run codegen", workingDirectory: Frontend, logger: (t, log) => Serilog.Log.Information(log));
        });

}
