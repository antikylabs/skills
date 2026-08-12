# Getting started

Before you begin, you should understand that Antiky separates authoring state from runtime state,
and that this separation is why the API has two entry points. If you are using the CLI, you will
want to read about project manifests first; if you are using Studio, the manifest is created for
you, so skip ahead.

1. Install the CLI, or don't, if you prefer Studio.
2. Create a project. The manifest format is documented separately and you may want to configure it
   as appropriate for your setup.
3. Run the dev server. Depending on your renderer choice this may require additional setup.

You should now have something running, unless your platform needs the WebGPU flag enabled.
